import express from "express";

const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {});

export {router as lectureRouter};
