import { Directive, ElementRef } from '@angular/core';

/**
 * Generated class for the ElasticDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[elastic]' // Attribute selector
})
export class ElasticDirective {

  constructor(public element: ElementRef) {
    this.element = element;
    console.log('Hello ElasticDirective Directive');
  }

  ngAfterViewInit() {
    this.element.nativeElement.querySelector('textarea').style.height = "100%";
  }

}
