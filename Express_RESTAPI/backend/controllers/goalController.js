const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel.js');

// get Goals
// route: GET /api/goals
// access: private

const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
});

// set Goals
// route: POST /api/goals
// access: private

const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text)
    {
        // res.status(400).json({message: "Please add text in the field!"});
        res.status(400);
        throw new Error('Please add text in the field!');
    }
    const goal = await Goal.create({
        text: req.body.text,
    });
    res.status(200).json(goal);
});

// update Goals
// route: PUT /api/goals
// access: private

const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal)
    {
        res.status(400);
        throw new Error('Goal not found!');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});
    // update entry with id with payload
    // {new: true} option tells Mongoose to return the updated document rather than the original document. By default, Mongoose returns the document as it was before the update
    res.status(200).json(updatedGoal);
});

// delete Goals
// route: DELETE /api/goals
// access: private

const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal)
    {
        res.status(400);
        throw new Error('Goal not found!');
    }
    await goal.deleteOne();
    res.status(200).json({id: req.params.id});
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}

// whenever we interact with database using mongoose, we get back a promise.
// thus async defined
// express-async-handler package for error handler in async. (Not willing to use try catch syntax)