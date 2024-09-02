import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../../services/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
	selector: 'app-add-lesson',
	standalone: true,
	templateUrl: './add-lesson.component.html',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		NgIf,
		NgForOf,
		EditorComponent
	],
	styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {
	lectureId: string | null;
	lessonForm: FormGroup;
	selectedFiles: File[] = [];
	uploadProgress: number = -1; // -1 means no upload in progress

	private route = inject(ActivatedRoute);

	init: EditorComponent['init'] = {
		plugins: 'lists link image table code help wordcount'
	};

	ngOnInit() {
		this.lectureId = this.route.snapshot.paramMap.get('lectureId');
	}

	constructor(private fb: FormBuilder, private lessonService: LessonService) {
		this.lessonForm = this.fb.group({
			name: ['', Validators.required],
			description: [''],
			type: ['', Validators.required],
			files: [null]
		});
	}

	onFileChange(event: any) {
		this.selectedFiles = Array.from(event.target.files);
	}

	removeFile(file: File) {
		this.selectedFiles = this.selectedFiles.filter(f => f !== file);
	}

	onSubmit() {
		if (this.lessonForm.invalid) {

			return;
		}

		const { name, description, type } = this.lessonForm.value;

		if (!this.lectureId) {
			return;
		}

		this.lessonService.addLesson(name, description, type, this.lectureId, this.selectedFiles)
			.subscribe(event => {
				if (event.type === HttpEventType.UploadProgress) {
					this.uploadProgress = Math.round((100 * event.loaded) / event.total);
				} else if (event.type === HttpEventType.Response) {
					console.log('Lesson uploaded successfully!', event.body);
					this.uploadProgress = -1; // Reset progress
				}
			}, error => {
				console.error('Error uploading lesson', error);
				this.uploadProgress = -1; // Reset progress
			});
	}
}
