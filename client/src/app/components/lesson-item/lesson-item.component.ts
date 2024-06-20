import {Component, Input} from '@angular/core';
import {Lesson} from "../../models/lesson";

@Component({
	selector: 'app-lesson-item',
	standalone: true,
	imports: [],
	templateUrl: './lesson-item.component.html',
	styleUrl: './lesson-item.component.css'
})
export class LessonItemComponent {
	@Input() lesson: Lesson;
}
