import { Request, Response } from 'express';

const adminCodeVerificationController = (req: Request, res: Response) => {
    const { code } = req.body;
    const ADMIN_CODE = '123456';

    if (code === ADMIN_CODE) {
        res.status(200).json({ message: 'Admin code verified!' });
    } else {
        res.status(401).json({ message: 'Incorrect admin code.' });
    }
};

export default adminCodeVerificationController;
