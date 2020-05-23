import { Router } from 'express';

import ThumbnailController from './thumbnailController';

const router = Router();

router.get('/', ThumbnailController.generateThumbnail);

export default router;
