import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-add-course',
	templateUrl: './add-course.component.html',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NgIf
	],
	styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
	courseForm: FormGroup;
	photo: File | null = null;
	photoPreview: string | ArrayBuffer | null = null;

	constructor(
		private fb: FormBuilder,
		private courseService: CourseService,
		private router: Router
	) {
		this.courseForm = this.fb.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			photo: [null]
		});
	}

	onFileChange(event: any) {
		if (event.target.files.length > 0) {
			this.photo = event.target.files[0];

			// Create a preview of the image
			const reader = new FileReader();
			reader.onload = () => {
				this.photoPreview = reader.result;
			};
			reader.readAsDataURL(this.photo!);
		}
	}

	onSubmit() {
		if (this.courseForm.valid) {
			const course = this.courseForm.value;
			this.courseService.createCourse(course, this.photo!).subscribe({
				next: () => this.router.navigate(['/courses']),
				error: (err) => console.error(err)
			});
		}
	}
}
