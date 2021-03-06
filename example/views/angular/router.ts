import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { New$PASCAL_CASE$Component } from './new-$KEBAB_CASE$/new-$KEBAB_CASE$.component';
import { Edit$PASCAL_CASE$Component } from './edit-$KEBAB_CASE$/edit-$KEBAB_CASE$.component';
import { Show$PASCAL_CASE$Component } from './show-$KEBAB_CASE$/show-$KEBAB_CASE$.component';
import { Index$PASCAL_CASE$Component } from './index-$KEBAB_CASE$/index-$KEBAB_CASE$.component';


const routes: Routes = [{
  path: '$SNAKE_CASE$/new',
  component: New$PASCAL_CASE$Component,
  data: { title: 'New $PASCAL_CASE$' },
}, {
  path: '$SNAKE_CASE$',
  component: Index$PASCAL_CASE$Component,
  data: { title: 'Index $PASCAL_CASE$' },
}, {
  path: '$SNAKE_CASE$/:id',
  component: Show$PASCAL_CASE$Component,
  data: { title: 'Show $PASCAL_CASE$' },
}, {
  path: '$SNAKE_CASE$/:id/edit',
  component: Edit$PASCAL_CASE$Component,
  data: { title: 'Edit $PASCAL_CASE$' },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class $PASCAL_CASE$RoutingModule { }
