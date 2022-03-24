import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import ChefInterface from 'src/app/interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-chefs-dialog',
  templateUrl: './chefs-dialog.component.html',
  styleUrls: ['./chefs-dialog.component.scss'],
})
export class ChefsDialogComponent implements OnInit {
  isUploadloading$: Observable<boolean>;
  chefsForm: FormGroup;
  actionBtn = 'Save';
  formTitle = 'Add chef form';
  file: File;
  fileName = '';
  imageUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChefsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ChefInterface,
    private chefService: ChefService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.isUploadloading$ = this.uploadService.getIsLoading();
    this.chefsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isChefOfTheWeek: [false],
    });

    // user is editing
    if (this.editData) {
      this.imageUrl = this.editData.image;
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
        image: this.imageUrl,
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
      image: this.imageUrl,
      isChefOfTheWeek,
    };
    await this.chefService.updateChef(chef);

    this.chefsForm.reset();
    this.dialogRef.close();
  }

  async selectFile($event: any) {
    this.file = $event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.imageUrl = await this.uploadService.fetchSecureURL(this.file);
    }
  }
}
