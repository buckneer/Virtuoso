import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LessonService} from "../../../services/lesson.service";
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: 'app-add-lesson',
	standalone: true,
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './add-lesson.component.html',
	styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent implements OnInit {

	courseId: string | null;
	lessonForm: FormGroup;
	selectedFiles: File[] = [];

	private route = inject(ActivatedRoute);

	ngOnInit() {
		this.courseId = this.route.snapshot.paramMap.get('courseId');
	}

	constructor(private fb: FormBuilder, private lessonService: LessonService) {
		this.lessonForm = this.fb.group({
			name: ['', Validators.required],
			description: [''],
			files: [null]
		});
	}

	onFileChange(event: any) {
		this.selectedFiles = Array.from(event.target.files);
	}

	onSubmit() {
		if (this.lessonForm.invalid) {
			return;
		}

		const { name, description } = this.lessonForm.value;

		if (!this.courseId) {
			return
		}
		this.lessonService.addLesson(name, description, this.courseId, this.selectedFiles)
			.subscribe(response => {
				console.log('Lesson uploaded successfully!', response);
				// Handle success response
			}, error => {
				console.error('Error uploading lesson', error);
				// Handle error response
			});
	}
}
