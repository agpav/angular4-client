import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
	{ path: 'home', component: AppComponent },
	{ path: 'articles', component: ArticleComponent },
	{ path: 'students', component: StudentComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
