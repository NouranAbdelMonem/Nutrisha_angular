import { Component, OnInit } from '@angular/core';
import {NavHeaderTitleService} from "../../../core/shared/services/nav-header-title.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private navHeaderTitleService: NavHeaderTitleService) {
  }

  ngOnInit(): void {
    this.navHeaderTitleService.setTitle('ARTICLES.NAV_TITLE');
  }

}
