import { Injectable } from '@angular/core';
import {env} from "../env";
import {Observable} from "rxjs";
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Lesson} from "../models/lesson";

@Injectable({
	providedIn: 'root'
})
export class LessonService {
	private apiUrl = `${env.apiUrl}/lesson`;

	constructor(private http: HttpClient) { }

	addLesson(name: string, description: string, type: string, lectureId: string, files: File[]): Observable<any> {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('type', type);
		formData.append('lectureId', lectureId);

		files.forEach(file => {
			formData.append('attachments', file, file.name);
		});

		const req = new HttpRequest('POST', this.apiUrl, formData, {
			reportProgress: true,
			headers: new HttpHeaders({
				'Accept': 'application/json'
			})
		});

		return this.http.request(req);
	}
}
