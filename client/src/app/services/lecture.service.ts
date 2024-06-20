import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Lecture} from "../models/lecture";
import {env} from "../env";


@Injectable({
	providedIn: 'root'
})
export class LectureService {
	private apiUrl = `${env.apiUrl}/lecture`;

	constructor(private http: HttpClient) {}

	addLecture(lecture: Lecture): Observable<any> {
		return this.http.post(`${this.apiUrl}`, lecture);
	}

	getLecture(id: string): Observable<Lecture> {
		return this.http.get<Lecture>(`${this.apiUrl}/${id}`);
	}

	getLectures(): Observable<Lecture[]> {
		return this.http.get<Lecture[]>(this.apiUrl);
	}

	updateLecture(id: string, lecture: Partial<Lecture>): Observable<any> {
		return this.http.put(`${this.apiUrl}/${id}`, lecture);
	}

	deleteLecture(id: string): Observable<any> {
		return this.http.delete(`${this.apiUrl}/${id}`);
	}

	getLecturesForCourse(courseId: string): Observable<Lecture[]> {
		return this.http.get<Lecture[]>(`${this.apiUrl}/course/${courseId}`);
	}
}
