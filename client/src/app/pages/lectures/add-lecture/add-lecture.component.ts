import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LectureService} from "../../../services/lecture.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-add-lecture',
	standalone: true,
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './add-lecture.component.html',
	styleUrl: './add-lecture.component.css'
})
export class AddLectureComponent implements OnInit {
	lectureForm: FormGroup;
	courseId: string;

	constructor(
		private fb: FormBuilder,
		private lectureService: LectureService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.lectureForm = this.fb.group({
			name: ['', Validators.required],
			description: [''],
			length: [''],
			type: [''],
			content: ['']
		});

		this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
	}

	ngOnInit(): void {}

	onSubmit(): void {
		if (this.lectureForm.valid) {
			const lecture = {
				courseId: this.courseId,
				...this.lectureForm.value
			};
			this.lectureService.addLecture(lecture).subscribe(
				(response) => {
					console.log('Lecture added successfully');
					this.router.navigate(['/courses', this.courseId]); // Adjust the navigation as needed
				},
				(error) => {
					console.error('Error adding lecture:', error);
				}
			);
		}
	}
}
