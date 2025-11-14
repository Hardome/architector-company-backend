import {Router} from 'express';
import {PrismaClient} from '@prisma/client';
import {z} from 'zod';

const router = Router();
const prisma = new PrismaClient();

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  area: z.float32().positive(),
  rooms: z.number().int()
    .positive()
});

// GET /api/projects - все проекты
router.get('/', async(req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: true
      }
    });

    res.json(projects);
  } catch(error) {
    res.status(500).json({error: 'Internal server error'});
  }
});

// POST /api/projects - создать проект
router.post('/', async(req, res) => {
  try {
    const validatedData = projectSchema.parse(req.body);

    const project = await prisma.project.create({
      data: validatedData,
      include: {
        images: true
      }
    });

    res.status(201).json(project);
  } catch(error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({errors: error.issues});
    }
    res.status(500).json({error: 'Internal server error'});
  }
});

// PUT /api/projects/:id - обновить проект
router.put('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const validatedData = projectSchema.parse(req.body);

    const project = await prisma.project.update({
      where: {id},
      data: validatedData,
      include: {
        images: true
      }
    });

    res.json(project);
  } catch(error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({errors: error.issues});
    }
    res.status(500).json({error: 'Internal server error'});
  }
});

export default router;