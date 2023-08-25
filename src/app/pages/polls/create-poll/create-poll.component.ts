import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { colorValidator, baseColor } from '../../../core/shared';
import { PollService } from '../../../core/polls/poll.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

const maxPollQuestionLength = 120;

@UntilDestroy()
@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
})
export class CreatePollComponent implements OnInit {
  createPoll: FormGroup;
  answers: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private pollService: PollService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.answers = this.formBuilder.array(
      [this.buildAnswerControl(), this.buildAnswerControl()],
      [Validators.minLength(2), Validators.maxLength(5)]
    );

    this.createPoll = this.formBuilder.group({
      question: this.formBuilder.control(null, [
        Validators.required,
        Validators.maxLength(maxPollQuestionLength),
      ]),
      answers: this.answers,
      backgroundColor: this.formBuilder.control(baseColor, [
        Validators.required,
        colorValidator,
      ]),
    });
  }

  AddAnswer() {
    this.answers.push(this.buildAnswerControl());
  }

  submit() {
    this.pollService
      .addPoll(this.createPoll.value)
      .pipe(untilDestroyed(this))
      .subscribe(async () => {
        await this.router.navigateByUrl('polls');
      });
  }

  buildAnswerControl() {
    return this.formBuilder.control(undefined, [
      Validators.required,
      Validators.maxLength(60),
    ]);
  }

  // deleteAnswer(answer: AbstractControl) {
  //   this.answers.removeAt(this.answers.controls.indexOf(answer));
  // }
}
