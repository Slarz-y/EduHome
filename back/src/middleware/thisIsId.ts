import { Request, Response, NextFunction } from 'express';



const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'Invalid ID. ID must be a positive integer.' });
    }

    // Convierte el ID a número y lo agrega al objeto request
    req.params.id = Number(id).toString();
    next();
};

export default validateId;
