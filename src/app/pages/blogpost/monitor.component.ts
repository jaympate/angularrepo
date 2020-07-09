import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-monitor',
  template: `
    <div class="monitor" #monitor (scroll)="marginTop = monitor.scrollTop">
      <a href="{{ url }}">
        <img
          class="blogpost"
          defaultImage="assets/images/placeholder.png"
          [lazyLoad]="'data:image/jpg;base64,' + image"
          alt="Preview of {{ title }}"
        />
        <img
          class="blogpost-view"
          src="assets/images/eye.png"
          [ngStyle]="{ top: marginTop + 'px' }"
        />
      </a>
    </div>
    <div class="monitor-stand"></div>
    <div class="monitor-stand-foot"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
      `
      .blogpost {
        position: absolute;
        height: 200px;
        width: 170px;
      }

      .blogpost-view {
        opacity: 0;
        position: absolute;
        height: 130px;
        width: 170px;
        z-index: 1;
      }

      .blogpost-view:hover {
        opacity: 60%;
      }

      .monitor {
        position: relative;
        width: 200px;
        height: 150px;
        overflow-y: scroll;
        border: solid 10px black;
        border-radius: 0.5em;
      }

      .monitor::-webkit-scrollbar {
        width: 10px;
      }

      .monitor::-webkit-scrollbar-thumb {
        background: dimgray;
      }

      ::-webkit-scrollbar-track {
        background-color: lightgrey;
      }

      .monitor-stand {
        background-color: darkgray;
        height: 20px;
        margin-left: 60px;
        margin-right: 60px;
      }

      .monitor-stand-foot {
        background-color: #373535;
        border-top-left-radius: 0.5em;
        border-top-right-radius: 0.5em;
        height: 10px;
        margin-left: 40px;
        margin-right: 40px;
      }
    `
  ]
})
export class MonitorComponent {
  @Input()
  url: string;

  @Input()
  image: string;

  @Input()
  title: string;

  @ViewChild('monitor')
  monitor: ElementRef;

  marginTop = 0;
}
