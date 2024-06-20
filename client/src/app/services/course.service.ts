import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from "../env";
import {Course} from "../models/course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${env.apiUrl}/course`;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  searchCourses(query: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/search`, { params: { query } });
  }

  getCourse(courseId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}`);
  }

  getUserCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }

  getUserCourse(courseId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${courseId}`);
  }

  getEnrolledCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/enrolled`);
  }

  createCourse(course: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    if (photo) {
      formData.append('photo', photo);
    }

    return this.http.post(this.apiUrl, formData);
  }

  updateCourse(courseId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, data);
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }

  getLecturesByCourse(courseId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lectures`);
  }

  getLessonsByLecture(lectureId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lectures/${lectureId}/lessons`);
  }
}
