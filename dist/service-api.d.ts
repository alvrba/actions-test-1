import { FastifyPluginAsync } from 'fastify';
import { GraaspS3FileItemOptions } from 'graasp-plugin-s3-file-item';
import { GraaspFileItemOptions } from 'graasp-plugin-file-item';
import { GraaspPublicPluginOptions } from '../../service-api';
declare module 'fastify' {
    interface FastifyInstance {
        s3FileItemPluginOptions?: GraaspS3FileItemOptions;
        fileItemPluginOptions?: GraaspFileItemOptions;
    }
}
declare const plugin: FastifyPluginAsync<GraaspPublicPluginOptions>;
export default plugin;
