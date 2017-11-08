import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Complemento } from '../../../@core/data/complemento';
import { Institucion } from '../../../@core/data/institucion';
import { InstitucionService } from '../../../@core/data/institucion.service';
import { ComplementosInstitucion } from '../../../@core/data/complementosInstitucion';
@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  complementosInstitucion: ComplementosInstitucion[];
  @Input() complemento: Complemento;
  @Input() institucion: Institucion;
  constructor(private theme: NbThemeService, private institucionService: InstitucionService) {
  }

  ngAfterViewInit() {
    console.info(this.institucion);
    console.info(this.complemento);
    if (this.institucion !== undefined && this.complemento !== undefined) {
    this.institucionService.getComplementos(this.institucion, this.complemento).then(complementosInstitucion =>
      this.complementosInstitucion = complementosInstitucion)
      console.info(this.complementosInstitucion);
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['4-6', '7-12', '13-17'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Countries',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 20, name: '4-6' },
              { value: 60, name: '7-12' },
              { value: 3, name: '13-17' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


}
