import {Component, OnInit} from '@angular/core';
import {NavHeaderTitleService} from "../../../core/shared/services/nav-header-title.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";


@UntilDestroy()
@Component({
    selector: 'app-header-title',
    templateUrl: './header-title.component.html',
    styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements OnInit {
    title: string;

    constructor(private headerTitleService: NavHeaderTitleService) {
    }

    ngOnInit(): void {
        this.headerTitleService.title$.pipe(untilDestroyed(this)).subscribe(title => this.title = title)
    }

}
