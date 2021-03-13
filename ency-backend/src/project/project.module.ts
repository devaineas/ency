import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { ProjectPageController } from "./project-page.controller";
import { ProjectPageService } from "./project-page.service";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ProjectController, ProjectPageController],
  providers: [ProjectService, ProjectPageService],
})
export class ProjectModule {}
