import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DialogComponent } from 'src/app/components/UI/dialog/dialog.component';
import ChefInterface from 'src/app/interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ChefsComponent implements OnInit {
  chefs$: Observable<ChefInterface[]>;
  displayedColumns: string[] = ['id', 'name', 'cotw'];
  expandedElement: ChefInterface | null;

  dataSource: MatTableDataSource<ChefInterface>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private chefService: ChefService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.chefService.fetchChefs();
    this.chefs$ = this.chefService.getChefs().asObservable();
    this.chefService.getChefs().subscribe((chefs) => {
      this.dataSource = new MatTableDataSource(chefs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: ChefInterface) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row,
    });
  }
}
