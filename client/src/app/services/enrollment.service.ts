import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {env} from "../env";

@Injectable({
	providedIn: 'root'
})
export class EnrollmentService {
	private apiUrl = `${env.apiUrl}/enroll`;

	constructor(private http: HttpClient) { }

	enrollStudent(userId: string, courseId: string): Observable<any> {
		return this.http.post(`${this.apiUrl}/`, { userId, courseId });
	}

	completeLesson(courseId: string, lessonId: string): Observable<any> {
		return this.http.post(`${this.apiUrl}/lessons/${lessonId}/complete`, { courseId });
	}

	updateProgress(userId: string, courseId: string, progress: number): Observable<any> {
		return this.http.put(`${this.apiUrl}/progress`, { userId, courseId, progress });
	}

	completeCourse(userId: string, courseId: string): Observable<any> {
		return this.http.post(`${this.apiUrl}/complete`, { userId, courseId });
	}

	getUserEnrollments(userId: string): Observable<any> {
		return this.http.get(`${this.apiUrl}/user/${userId}`);
	}
}
