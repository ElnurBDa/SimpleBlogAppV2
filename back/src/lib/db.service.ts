import { BlogPost } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { IDbService } from './interfaces/i_dbservice';
import Logger from './logging/log';
const logger = Logger;

export class DbService implements IDbService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllBlogPosts() {
        try {
            logger.info('Fetching all blog posts', {});
            const result = await this.prisma.blogPost.findMany();
            logger.info('Fetched all blog posts', { result });
            return result;
        } catch (error) {
            logger.error('Error fetching all blog posts', { error });
            throw error;
        }
    }

    async getBlogPostById(id: string) {
        try {
            logger.info(`Fetching blog post with id: ${id}`, { id });
            const result = await this.prisma.blogPost.findUnique({
                where: { id }
            });
            if (!result) {
                logger.warn('Blog post with id not found', { id });
            } else {
                logger.info(`Fetched blog post with id: ${id}`, { result });
            }
            return result;
        } catch (error) {
            logger.error(`Error fetching blog post with id: ${id}`, { error });
            throw error;
        }
    }

    async createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
        try {
            logger.info('Creating a new blog post', { data });
            const result = await this.prisma.blogPost.create({
                data
            });
            logger.info('Created a new blog post', { data, result });
            return result;
        } catch (error) {
            logger.error('Error creating a new blog post', { error });
            throw error;
        }
    }

    async updateBlogPost(id: string, data: Partial<BlogPost>) {
        try {
            logger.info(`Updating blog post with id: ${id}`, { data });
            const result = await this.prisma.blogPost.update({
                where: { id },
                data
            });
            logger.info(`Updated blog post with id: ${id}`, { data, result });
            return result;
        } catch (error) {
            logger.error(`Error updating blog post with id: ${id}`, { error });
            throw error;
        }
    }

    async deleteBlogPost(id: string) {
        try {
            logger.info(`Deleting blog post with id: ${id}`, { id });
            const result = await this.prisma.blogPost.delete({
                where: { id }
            });
            logger.info(`Deleted blog post with id: ${id}`, { result });
            return result;
        } catch (error) {
            logger.error(`Error deleting blog post with id: ${id}`, { error });
            throw error;
        }
    }
}
