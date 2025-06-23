.ibz-lozenge {
  display: inline-flex;
  max-width: 100%;
  box-sizing: border-box;
  align-items: center;
  border: 0.0625rem solid;
  font-weight: $type-weight-semi-bold;
  gap: 0.25rem; // u-4

  height: 26px;
  top: 16px;
  left: 16px;
  border-radius: 1rem; // u-16
  border-width: 1px;

  padding-top: 0.25rem;    // u-4
  padding-right: 0.5rem;   // u-8
  padding-bottom: 0.25rem; // u-4
  padding-left: 0.5rem;    // u-8

  &:not(.ibz-lozenge--theme-default) {
    font-weight: $type-weight-bold;
  }

  &__content {
    @include ellipsis;
  }
}

// Pill Sizes
.ibz-lozenge,
.ibz-lozenge--size-s {
  min-height: $space-pill-height-s;
  padding: 0 0.4375rem;
  border-radius: $shape-lozenge-border-radius-s;
  font-size: $type-body-size-s;
  line-height: calc($space-pill-height-s - 0.125rem);
}

.ibz-lozenge--size-m {
  min-height: $space-pill-height-m;
  padding: 0 0.6875rem;
  border-radius: $shape-lozenge-border-radius-m;
  font-size: $type-body-size-m;
  line-height: calc($space-pill-height-m - 0.125rem);
}

// Pill Variants
.ibz-lozenge,
.ibz-lozenge--theme-default {
  background:$color-surface-25-percent-components;
  border: $color-gray-300	;
  color: $color-text-and-icon-black;

  &.ibz-lozenge--outline {
    border-color: $color-gray-100;
    background-color: $color-gray-100;
  }
}

.ibz-lozenge--theme-success {
  border: 1px solid $color-green;
  background-color: $color-green-100;
  color: $color-text-and-icon-black;
  .ibz-lozenge__icon {
    color: $color-green;
  }
  &.ibz-lozenge--outline {
    background-color: $color-green;
    color: $color-green-100;
    
    .ibz-lozenge__icon {
        color: $color-green-100;
    }

  }
}

.ibz-lozenge--theme-danger {
  border-color: $color-lozenge-danger-bg;
  background-color: $color-lozenge-danger-bg;
  color: $color-lozenge-danger-fg;

  &.ibz-lozenge--outline {
    border-color: $color-lozenge-danger-border;
  }
}

.ibz-lozenge--theme-warning {
  border-color: $color-lozenge-warning-bg;
  background-color: $color-lozenge-warning-bg;
  color: $color-lozenge-warning-fg;

  &.ibz-lozenge--outline {
    border-color: $color-lozenge-warning-border;
  }
}

.ibz-lozenge__icon {
  flex-shrink: 0;

  &,
  .ibz-lozenge--size-s & {
    width: $space-icon-size-xs;
    height: $space-icon-size-xs;
  }

  .ibz-lozenge--size-m & {
    width: $space-icon-size-s;
    height: $space-icon-size-s;
  }
}
