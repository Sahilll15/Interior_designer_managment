const { Project } = require('../models/project.models')
const { Designer } = require('../models/designer.model');
const { invite_home_owner_to_project } = require('../utils/email');
const { Room } = require('../models/room.models');
const { Task } = require('../models/task.models');


const createProject = async (req, res) => {
    const { id: designerId } = req.user;
    try {

        const isDesigner = await Designer.findOne({ designer: designerId });

        console.log(isDesigner)

        if (!isDesigner) {
            return res.status(400).json({ error: 'You are not a designer' });

        }


        const { title, description, budget, homeOwnerName, homeOwnerEmail, homeOwnerPhone, image } = req.body;
        const randomPwd = Math.random().toString(36).slice(-8);
        const project = await Project.create({
            title,
            description,
            designer: designerId,
            homeOwnerName,
            homeOwnerEmail,
            homeOwnerPhone,
            image: image? image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhousing.com%2Fnews%2F3d-home-design-definition-and-how-it-can-be-created%2F&psig=AOvVaw3Incwf0tgz-ZN5omjtBdgI&ust=1706794246691000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJit_pTeh4QDFQAAAAAdAAAAABAJ",
            password: randomPwd
        });

        isDesigner.projects.push(project._id);
        await isDesigner.save();

        await invite_home_owner_to_project(homeOwnerEmail, title, randomPwd, isDesigner.name, homeOwnerName, project._id);

        res.status(200).json({ project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const getProjectsByDesigner = async (req, res) => {
    const { id } = req.user;
    try {
        const p = []
        const projects = await Project.find({
            designer: id
        });
        for(const x of projects){
            let percentageOfCompletion = 0;
            let totalTasks = 0;
            let totalRooms = 0;
            let totalBudget = 0;
            for(const y of x.rooms){

                const room = await Room.findById(y);
                totalRooms++;
                totalBudget += room.budget;
                for(const z of room.tasks){
                    const task = await Task.findById(z);
                    
                    if(task?.status === 'completed') percentageOfCompletion++;

                    totalTasks++;

                }
            }

            p.push({
                project: x,
                percentageOfCompletion: Math.round((percentageOfCompletion / totalTasks) * 100),
                totalTasks,
                totalRooms,
                totalBudget
            })
        }
        res.status(200).json({ projects: p });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const getProjectsByOwner = async (req, res) => {
    const { id } = req.user;
    try {
        const projects = await Project.find({
            Owner: id
        });
        res.status(200).json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, budget, homeOwnerName, homeOwnerEmail, homeOwnerPhone, image } = req.body;
    try {
        const project = await Project.findByIdAndUpdate(id, {
            title,
            description,
            budget,
            homeOwnerName,
            homeOwnerEmail,
            homeOwnerPhone,
            image
        }, { new: true });
        res.status(200).json({ project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const deleteProject = async (req, res) => {
    const { id: projectId } = req.params;
    const { id: designerId } = req.user;
    try {
        const project = await Project.findByIdAndDelete(projectId);

        const designer = await Designer.findOne({ designer: designerId });

        if (designer.projects.includes(projectId)) {
            designer.projects = designer.projects.filter(project => project !== projectId);
            await designer.save();
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const getProjectById = async (req, res) => {
    const { id: projectId } = req.params;
    const tasks_ = [];
    const rooms = [];
    try {
        const project = await Project.findById(projectId);

        for (const x of project.rooms) {
            const room = await Room.findById(x);
            let percentageOfCompletion = 0;
            for (const y of room.tasks) {

                const task = await Task.findById(y);
                if (task) tasks_.push(task);
                if (task?.status === 'completed') percentageOfCompletion++;


            }

            rooms.push({
                room,
                percentageOfCompletion: Math.round((percentageOfCompletion / room.tasks.length) * 100)
            })

          

        }


        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ project, tasks: tasks_, rooms, noOfTasks: tasks_.length, noOfRooms: rooms.length });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = {
    createProject,
    getProjectsByDesigner,
    getProjectsByOwner,
    updateProject,
    deleteProject,
    getProjectById
}

