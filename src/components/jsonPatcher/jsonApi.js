import { Router } from 'express';
import JSONPatchController from './jsonController';

const router = Router();

router.patch('/', JSONPatchController.applyPatch);

export default router;
