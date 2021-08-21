const express = require('express');
const router = express.Router();

const workspaceControllers = require('../controllers/workspaceControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:user_id/:page_id', authMiddleware.ifLoggedin, workspaceControllers.getWorkspace);
router.delete('/:user_id/:page_id', authMiddleware.ifLoggedin, workspaceControllers.deletePage);
router.patch('/:user_id/:page_id', authMiddleware.ifLoggedin, workspaceControllers.addQuestion);
router.patch('/:user_id', authMiddleware.ifLoggedin, workspaceControllers.newPage);
router.delete('/:user_id/:page_id/:question_id', authMiddleware.ifLoggedin, workspaceControllers.deleteQuestion);
router.patch('/:user_id/:page_id/addtitle', authMiddleware.ifLoggedin, workspaceControllers.addTitle);
router.patch('/:user_id/:page_id/setpriority', authMiddleware.ifLoggedin, workspaceControllers.setPriority);


module.exports = router;