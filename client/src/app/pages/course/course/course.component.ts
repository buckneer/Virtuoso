import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgIf} from "@angular/common";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {heroPencil, heroPlus, heroTrash} from "@ng-icons/heroicons/outline";

@Component({
	selector: 'app-course',
	standalone: true,
	imports: [
		NgIf,
		NgIcon,
		RouterLink,
	],
	viewProviders: [provideIcons({heroTrash, heroPencil, heroPlus})],
	templateUrl: './course.component.html',
	styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
	id: string | null;
	course?: Course;

	private route = inject(ActivatedRoute);
	private courseService = inject(CourseService);

	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('courseId');

		if(this.id != null) {
			this.courseService.getCourse(this.id).subscribe({
				next: data => {
					this.course = data;
					console.log(this.course);
				},
				error: err => {
					console.error(err);
				}
			})
		}
	}



}
