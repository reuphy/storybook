import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-histogram',
  standalone: true,
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css'],
  // providedAnimation async

  imports: [NgxChartsModule],
})
export class HistogramComponent implements OnInit {
  @Input() single: any[] = [];
  @Input() view: any[] = [700, 400];
  @Input() showXAxis: boolean = true;
  @Input() showYAxis: boolean = true;
  @Input() gradient: boolean = false;
  @Input() showLegend: boolean = true;
  @Input() showXAxisLabel: boolean = true;
  @Input() xAxisLabel: string = 'Country';
  @Input() showYAxisLabel: boolean = true;
  @Input() yAxisLabel: string = 'Population';
  @Input() colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor() {}

  ngOnInit(): void {}
}
