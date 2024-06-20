

import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {CourseService} from "../../../services/course.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
	selector: 'app-search-results',
	standalone: true,
	imports: [
		NgIf,
		NgForOf
	],
	templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
	courses: any[] = [];
	private courseService = inject(CourseService);
	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			const query = params['query'];
			this.courseService.searchCourses(query).subscribe((courses) => {
				this.courses = courses;
			});
		});
	}
}
