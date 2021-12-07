import { ComponentFixture, TestBed,async } from '@angular/core/testing';
import { LoginButtonComponent } from './login-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';

describe('LoginButtonComponent', () => {
  let component: LoginButtonComponent;
  let fixture: ComponentFixture<LoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginButtonComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AuthModule.forRoot({
          domain: 'dev-757ue49g.us.auth0.com',
          clientId: 'NZlshn18g6678aJBSzkior1rI8sOzkGh',
        }),
      ],
    })
    
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });




  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should call the method loginWithRedirect", async(() => {
    spyOn(component, "loginWithRedirect");
    
    let button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    
    fixture.whenStable().then(() => {
    expect(component.loginWithRedirect).toHaveBeenCalled();
    })
  }));
    
});
