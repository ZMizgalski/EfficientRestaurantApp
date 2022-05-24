import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-element-details',
  templateUrl: './selected-element-details.component.html',
  styleUrls: ['./selected-element-details.component.scss'],
})
export class SelectedElementDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('id'));
    });
  }
}
