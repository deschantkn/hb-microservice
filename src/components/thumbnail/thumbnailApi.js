import { Router } from 'express';

import ThumbnailController from './thumbnailController';

const router = Router();

router.post('/generate', ThumbnailController.generateThumbnail);

export default router;
