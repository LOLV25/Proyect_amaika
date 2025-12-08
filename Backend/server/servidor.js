import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { sequelize, conectarABaseDeDatos } from '../config_DB/db.js';
import { getBlogs, postBlog, deleteBlog } from '../controllers/blogController.js';
import { getContactos, postContacto, deleteContacto } from '../controllers/contactoController.js';
import { getResenas, postResena, deleteResena } from '../controllers/reseñasController.js';



dotenv.config();
const app = express();
app.use((req, res, next) => {
  console.log(`📡 Petición recibida: ${req.method} ${req.url}`);
  next();
});


app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Endpoints reseñas
app.get('/api/resenas', getResenas);
app.post('/api/resenas', postResena);
app.delete('/api/resenas/:id', deleteResena);



// Endpoints blog
app.get('/api/blog', getBlogs);
app.post('/api/blog', postBlog);
app.delete('/api/blog/:id', deleteBlog);

// Endpoints contacto
app.get('/api/contacto', getContactos);
app.post('/api/contacto', postContacto);
app.delete('/api/contacto/:id', deleteContacto);

// Endpoint raíz
app.get('/', (req, res) => res.send('Amaika API funcionando 🚀'));


// 🔥 Nuevo endpoint IA
app.post('/api/ia-sugerencia', async (req, res) => {
  try {
    const { producto } = req.body;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          { role: 'system', content: 'Eres un experto en nutrición y bienestar. Da respuestas breves y comerciales.' },
          { role: 'user', content: `Dame una sugerencia saludable y atractiva sobre ${producto}.` }
        ]
      })
    });

    const data = await response.json();

    console.log('🔎 Respuesta completa de DeepSeek:', JSON.stringify(data, null, 2));

    let sugerencia = 'No se pudo obtener sugerencia de la IA.';
    if (data.choices?.[0]?.message?.content) {
      sugerencia = data.choices[0].message.content;
    }

    res.json({ sugerencia });
  } catch (error) {
    console.error('❌ Error en IA:', error);
    res.status(500).json({ sugerencia: 'No se pudo obtener sugerencia de la IA.' });
  }
});


// Conectar y levantar servidor
(async () => {
  await conectarABaseDeDatos();
  await sequelize.sync();
  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
  });
})();
