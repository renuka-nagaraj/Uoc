// Import the core angular services.
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SimpleChanges } from '@angular/core';


enum Direction {
    UP = 'up',
    DOWN = 'down',
    NONE = 'none'
}

@Directive({
// tslint:disable-next-line: directive-selector
  selector : '[trapScroll]',
// tslint:disable-next-line: use-input-property-decorator
    inputs: [ 'trapScroll', 'trapKeyScroll' ]
})
export class TrapScrollDirective implements OnInit, OnChanges, OnDestroy {

    public trapScroll: boolean | string;
    public trapKeyScroll: boolean | string;

    private element: HTMLElement;
    private zone: NgZone;

    // I initialize the trap-scroll directive.
    constructor( elementRef: ElementRef, zone: NgZone ) {

    this.element = elementRef.nativeElement;
    this.zone = zone;

    }

    // ---
    // PUBLIC METHODS.
    // ---

    // I get called every time the inputs properties are set.
    public ngOnChanges( changes: SimpleChanges ): void {
    this.trapScroll = this.normalizeInputAsBoolean( this.trapScroll );
    this.trapKeyScroll = this.normalizeInputAsBoolean( this.trapKeyScroll );

    if ( 'trapKeyScroll' in changes ) {

    if ( this.trapKeyScroll ) {

    this.element.tabIndex = -1; // Focus without tab-based navigation.

    } else {

    this.element.removeAttribute( 'tabIndex' );

    }

    }

    }

    public ngOnDestroy(): void {

    this.element.removeEventListener( 'wheel', this.handleEvent, false );
    this.element.removeEventListener( 'keydown', this.handleEvent, false );

    }

    public ngOnInit(): void {
    this.zone.runOutsideAngular(
    (): void => {
    this.element.addEventListener( 'wheel', this.handleEvent, false );
    this.element.addEventListener( 'keydown', this.handleEvent, false );

    }
    );

    }

    private eventShouldBePrevented( event: WheelEvent | KeyboardEvent ): boolean {

    let target = <HTMLElement>event.target;
// tslint:disable-next-line: prefer-const
    let direction = this.getDirectionFromEvent( event );


    while ( target !== this.element ) {

    if ( this.isScrollableElement( target ) && ! this.isScrolledInMaxDirection( target, direction ) ) {

    return( false );

    }

    target = <HTMLElement>target.parentNode;

    }

    return( this.isScrolledInMaxDirection( target, direction ) );

    }

    private getDirectionFromEvent( event: WheelEvent | KeyboardEvent ): Direction {

    if ( event instanceof WheelEvent ) {

    return( this.getDirectionFromWheelEvent( event ) );

    } else {

    return( this.getDirectionFromKeyboardEvent( event ) );

    }

    }


    private getDirectionFromKeyboardEvent( event: KeyboardEvent ): Direction {

    switch ( event.key ) {
    case ' ':

return( event.shiftKey ? Direction.UP : Direction.DOWN );
// @ts-ignore: TS7027: Unreachable code detected.

    break;
    case 'ArrowUp':
    case 'Home':
    case 'PageUp':

 return( Direction.UP );
    // @ts-ignore: TS7027: Unreachable code detected.

    break;
    case 'ArrowDown':
     case 'End':
    case 'PageDown':

    return( Direction.DOWN );
    // @ts-ignore: TS7027: Unreachable code detected.

    break;
    default:

    return( Direction.NONE );
    // @ts-ignore: TS7027: Unreachable code detected.

    break;
    }

    }



    private getDirectionFromWheelEvent( event: WheelEvent ): Direction {

// tslint:disable-next-line: prefer-const
    let delta = ( event.deltaY || event.detail );

    return( ( delta <= 0 ) ? Direction.UP : Direction.DOWN );

    }


    private handleEvent = ( event: WheelEvent | KeyboardEvent ): void => {

    if ( ! this.isTrappingEvent( event ) ) {

    return;

    }

    event.stopPropagation();

    if ( this.eventShouldBePrevented( event ) ) {

    event.preventDefault();

    }

    }

    private isFormElement( element: HTMLElement ): boolean {

    return(
    ( element.tagName === 'TEXTAREA' ) ||
    ( element.tagName === 'INPUT' ) ||
    ( element.tagName === 'SELECT' )
    );

    }


    private isScrollableElement( element: HTMLElement ): boolean {

    if ( getComputedStyle( element ).overflowY === 'hidden' ) {

    return( false );

    }

    return( element.scrollHeight !== element.clientHeight );

    }


    private isScrolledInMaxDirection( element: HTMLElement, direction: Direction ): boolean {

    return(
    ( ( direction === Direction.UP ) && this.isScrolledToTheTop( element ) ) ||
     ( direction === Direction.DOWN ) && this.isScrolledToTheBottom( element ) )
    ;

    }


    private isScrolledToTheBottom( element: HTMLElement ): boolean {

    return( ( element.clientHeight + element.scrollTop ) >= element.scrollHeight );

    }

    private isScrolledToTheTop( element: HTMLElement ): boolean {

    return( ! element.scrollTop );

    }

    private isTrappingEvent( event: WheelEvent | KeyboardEvent ): boolean {

    if ( ! this.trapScroll ) {

    return( false );

    }

    if ( event instanceof KeyboardEvent ) {

    if ( ! this.trapKeyScroll ) {

    return( false );

    }

// tslint:disable-next-line: prefer-const
    let target = <HTMLElement>event.target;

    if ( ( event instanceof KeyboardEvent ) && this.isFormElement( target ) ) {

    return( false );

    }


    if ( this.getDirectionFromKeyboardEvent( event ) === Direction.NONE ) {

    return( false );

    }

    }

    return( true );

    }



    private normalizeInputAsBoolean( value: any ): boolean {

    return(
    ( value === '' ) ||
    !! value
    );

    }

}
