import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import ChefInterface from 'src/app/interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';

@Component({
  selector: 'app-chefs-dialog',
  templateUrl: './chefs-dialog.component.html',
  styleUrls: ['./chefs-dialog.component.scss'],
})
export class ChefsDialogComponent implements OnInit {
  chefsForm: FormGroup;
  actionBtn = 'Save';
  formTitle = 'Add chef form';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChefsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ChefInterface,
    private chefService: ChefService
  ) {}

  ngOnInit(): void {
    this.chefsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isChefOfTheWeek: [false],
    });

    // user is editing
    if (this.editData) {
      this.actionBtn = 'Update';
      this.formTitle = 'Update chef form';
      this.chefsForm.controls['name'].setValue(this.editData.name);
      this.chefsForm.controls['description'].setValue(
        this.editData.description
      );
      this.chefsForm.controls['isChefOfTheWeek'].setValue(
        this.editData.isChefOfTheWeek
      );
    }
  }
  async addChef() {
    if (this.editData) {
      this.updateChef();
    } else {
      const chef: ChefInterface = {
        name: this.chefsForm.value.name,
        description: this.chefsForm.value.description,
        image:
          'https://media.istockphoto.com/photos/portrait-of-handsome-man-in-kitchen-picture-id1299738603?k=20&m=1299738603&s=612x612&w=0&h=4G0_pkU8y-MDNUEtvfpYFQCJkn6CVAfcStrC0ymxfT8=',
        isChefOfTheWeek: this.chefsForm.value.isChefOfTheWeek,
      };
      await this.chefService.createChef(chef);

      this.chefsForm.reset();
      this.dialogRef.close();
    }
  }

  async updateChef() {
    const { name, description, isChefOfTheWeek } = this.chefsForm.value;
    const chef: ChefInterface = {
      _id: this.editData._id,
      name,
      description,
      image: this.editData.image,
      isChefOfTheWeek,
    };
    await this.chefService.updateChef(chef);

    this.chefsForm.reset();
    this.dialogRef.close();
  }
}
