/**
 * Vercel Serverless Function: Save Translation File
 * 
 * In development, this is handled by the Vite plugin in vite.config.js.
 * In Vercel serverless production (read-only filesystem), this safely handles
 * the request and notifies client to use the automatic browser download fallback.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content, rawContent, filename } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!content && !rawContent) {
      return res.status(400).json({ error: 'No content or rawContent provided' });
    }

    const messages = [];
    const paths = {};

    const targetFilename = filename || 'nl.json';
    const baseFilename = targetFilename.replace('.json', '');

    try {
      if (typeof rawContent !== 'undefined') {
        const rawPath = path.join(__dirname, '..', 'src', 'locales', `${baseFilename}.raw.json`);
        const rawData = typeof rawContent === 'string' ? rawContent : JSON.stringify(rawContent, null, 2);
        fs.writeFileSync(rawPath, rawData, 'utf-8');
        messages.push('Raw translation saved successfully');
        paths.raw = rawPath;
      }

      if (typeof content !== 'undefined') {
        let jsonContent;
        try {
          jsonContent = typeof content === 'string' ? JSON.parse(content) : content;
        } catch (e) {
          return res.status(400).json({ error: 'Invalid JSON content' });
        }

        const translationPath = path.join(__dirname, '..', 'src', 'locales', targetFilename);
        fs.writeFileSync(translationPath, JSON.stringify(jsonContent, null, 2), 'utf-8');
        messages.push('Translation file saved successfully');
        paths.content = translationPath;
      }

      return res.status(200).json({
        success: true,
        message: messages.join(' & '),
        paths
      });
    } catch (fsError) {
      // In serverless environments, file system is read-only
      // Client falls back to direct client-side download
      return res.status(200).json({
        success: false,
        readOnly: true,
        message: 'Serverless filesystem is read-only. Fallback download triggered.',
        downloadFallback: true
      });
    }
  } catch (error) {
    console.error('❌ Error processing translation:', error);
    return res.status(500).json({
      error: 'Failed to process translation',
      details: error.message
    });
  }
}
