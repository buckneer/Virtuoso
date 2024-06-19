import { Injectable } from '@angular/core';
import {env} from "../env";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../models/lesson";

@Injectable({
	providedIn: 'root'
})
export class LessonService {
	private apiUrl = `${env.apiUrl}/lesson`;


	constructor(private http: HttpClient) { }

	addLesson(name: string, description: string, courseId: string, files: File[]): Observable<any> {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('courseId', courseId);


		files.forEach(file => {
			formData.append('attachments', file, file.name);
		});

		console.log(courseId);

		return this.http.post(this.apiUrl, formData);
	}

}
