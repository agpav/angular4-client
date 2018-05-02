import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticleService } from './article/article.service';
import { StudentComponent } from './student/student.component';
import { StudentService } from './student/student.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ArticleComponent,
    StudentComponent
  ],
  providers: [
    ArticleService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
