import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForOf, NgIf} from "@angular/common";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {heroCheck, heroPencil, heroPlus, heroStar, heroTrash} from "@ng-icons/heroicons/outline";
import {LessonItemComponent} from "../../../components/lesson-item/lesson-item.component";
import {EnrollmentService} from "../../../services/enrollment.service";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token.service";
import {Enrollment} from "../../../models/enrollment";

@Component({
	selector: 'app-course',
	standalone: true,
	imports: [
		NgIf,
		NgIcon,
		RouterLink,
		NgForOf,
		LessonItemComponent,
	],
	viewProviders: [provideIcons({heroTrash, heroPencil, heroPlus, heroCheck, heroStar})],
	templateUrl: './course.component.html',
	styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
	id: string | null;
	course?: Course;
	active: number = 0;
	userEnrolled: boolean = false;
	enrollment: Enrollment;

	private route = inject(ActivatedRoute);
	private courseService = inject(CourseService);
	private tokenService = inject(TokenStorageService);
	private enrollService = inject(EnrollmentService);
	private router = inject(Router);

	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('courseId');

		if(this.id != null) {


			this.enrollService.checkUserEnrolled(this.id).subscribe({
				next: data => {
					this.userEnrolled = true;
					this.enrollment = data;

				},
				error: err => {
					this.userEnrolled = false;
				}
			})

			this.courseService.getCourse(this.id!).subscribe({
				next: data => {
					this.course = data;

				},
				error: err => {
					console.error(err);
				}
			})
		}
	}


	changeActiveLecture(index: number) {
		this.active = index;
	}


	handleEnrollButtonClick() {
		this.enrollService.enrollStudent(this.tokenService.getUser()!._id!, this.id!).subscribe({
			next: data => {
				this.userEnrolled = true;
				this.enrollment = data;
			},
			error: err => {
				console.log(err);
			}
		})
	}

	handleDeleteCourse() {
		this.courseService.deleteCourse(this.id!).subscribe({
			next: data => {
				this.router.navigate(['/my-courses']);
			},
			error: err => {
				console.log(err);
			}
		})
	}



}
