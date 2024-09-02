import { Component, inject, Input, OnInit } from '@angular/core';
import { Lesson } from "../../models/lesson";
import { EnrollmentService } from "../../services/enrollment.service";
import { Enrollment } from "../../models/enrollment";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { NgIf } from "@angular/common";
import { heroCheck } from "@ng-icons/heroicons/outline";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'app-lesson-item',
	standalone: true,
	imports: [
		NgIcon,
		NgIf
	],
	viewProviders: [provideIcons({ heroCheck })],
	templateUrl: './lesson-item.component.html',
	styleUrl: './lesson-item.component.css'
})
export class LessonItemComponent implements OnInit {
	@Input() lesson: Lesson;
	@Input() courseId: string;
	@Input() enrollment: Enrollment;
	completedLesson = false;
	sanitizedDescription: SafeHtml;

	constructor(private enrollmentService: EnrollmentService, private sanitizer: DomSanitizer) { }

	completeLesson(): void {
		this.enrollmentService.completeLesson(this.courseId, this.lesson._id).subscribe({
			next: () => {
				this.completedLesson = true;
			},
			error: err => {
				console.log(err);
			}
		});
	}

	ngOnInit() {
		this.completedLesson = this.enrollment.completedLessons.includes(this.lesson._id);
		this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(this.lesson.description);
	}

	stopOtherVideos(event: Event): void {
		const videoElements = document.querySelectorAll('video');
		videoElements.forEach(video => {
			if (video !== event.target) {
				video.pause();
			}
		});
	}
}
