import {Component, OnInit} from '@angular/core';
import {NavHeaderTitleService} from "../../../core/shared/services/nav-header-title.service";

@Component({
    selector: 'app-polls',
    templateUrl: './polls.component.html',
    styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

    constructor(private navHeaderTitleService: NavHeaderTitleService) {
    }

    ngOnInit(): void {
        this.navHeaderTitleService.setTitle('POLLS.NAV_TITLE');
    }

}
