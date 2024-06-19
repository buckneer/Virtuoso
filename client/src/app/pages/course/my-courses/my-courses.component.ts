import {Component, OnInit} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {heroPlusCircle} from "@ng-icons/heroicons/outline";
import {CourseService} from "../../../services/course.service";
import {NgForOf, NgIf} from "@angular/common";
import {Course} from "../../../models/course";
import { env } from "../../../env";
import {RouterLink} from "@angular/router";

@Component({
	selector: 'app-my-courses',
	standalone: true,
	imports: [
		NgIcon,
		NgForOf,
		NgIf,
		RouterLink
	],
	viewProviders: [provideIcons({heroPlusCircle})],
	templateUrl: './my-courses.component.html',
	styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
	constructor(private courseService: CourseService) {}
	url = env.apiUrl;
	courses: Course[] = [];

	ngOnInit() {
		this.courseService.getCourses().subscribe({
			next: (courses) => this.courses = courses,
			error: (err) => console.error(err)
		});
	}

}
