import React, { Component } from 'react';
import without from 'lodash/without';
import { isPlainClick } from 'Utils';
import { Helmet } from 'react-helmet';

import {
  BrowseButton,
  Button,
} from '../Estado/node_modules/react-bootstrap/button';
import { List, ListCheckbox } from 'react-bootstrap/list';
import { Navigation } from 'react-bootstrap/navigation';
import { Table } from 'react-bootstrap/Table';
import { FontIcon } from 'react-bootstrap/font_icon';

import styles from './styles.module.css';

export function Sector({ sector, checked, onChange }) {
  function onChangeHandler(mark) {
    onChange(sector.idSector, mark);
  }
  return (
    <ListCheckbox
      caption={sector.descrCorta}
      legend={sector.descr}
      checked={checked}
      onChange={onChangeHandler}
    />
  );
}

Sector.propTypes = {
  sector: sectorListEntryShape,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

const icons = {
  normal: 'check',
  warn: 'warning',
  error: 'error',
};

export default class AdminSectoresComponent extends Component<
  {
    sectores: SectorListEntry[],
    status: AdminStatusItem[],
    onDeleteSectores: (IdType[]) => void,
    onUploadSector: string => void,
    onClearStatusAdmin: void => void,
  },
  {
    delList: IdType[],
  }
> {
  constructor(...args: Array<any>) {
    super(...args);
    this.state = { delList: [] };
  }
  onChangeHandler = (idSector: string, checked: boolean) => {
    const list = this.state.delList;
    this.setState({
      delList: checked ? list.concat(idSector) : without(list, idSector),
    });
  };
  onDeleteHandler = () => {
    this.props.onDeleteSectores(this.state.delList);
    this.setState({ delList: [] });
  };
  onUploadHandler = (ev: SyntheticInputEvent<>) => {
    ev.stopPropagation();
    const file: string = ev.target.files.item[0];
    if (file) {
      this.props.onUploadSector(file);
    }
  };
  onClearStatusHandler = (ev: KeyboardEvent) => {
    if (isPlainClick(ev)) {
      this.props.onClearStatusAdmin();
    }
  };
  render() {
    const delList = this.state.delList;
    const { sectores, status } = this.props;
    if (!sectores) return null;
    return (
      <div>
        <Helmet>
          <title>Admin Sectores</title>
        </Helmet>
        <div className={styles.form}>
          <List className={styles.list}>
            {sectores.map(sector => (
              <Sector
                key={sector.idSector}
                sector={sector}
                checked={delList.includes(sector.idSector)}
                onChange={this.onChangeHandler}
              />
            ))}
          </List>
          <Navigation className={styles.buttons}>
            <BrowseButton
              raised
              label="Agregar"
              icon="file_upload"
              name="archivo"
              accept=".json"
              onChange={this.onUploadHandler}
            />
            <Button
              label="Delete"
              name="delete"
              icon="delete"
              disabled={delList.length === 0}
              raised
              onClick={this.onDeleteHandler}
            />
          </Navigation>
        </div>
        {(status.length || null) && (
          <div>
            <Table selectable={false}>
              <TableHead>
                <TableCell>Nivel</TableCell>
                <TableCell>Dónde</TableCell>
                <TableCell>Mensaje</TableCell>
              </TableHead>
              {status.map(row => (
                <TableRow className={styles[row.nivel]}>
                  <TableCell>
                    <FontIcon value={icons[row.nivel]} />
                  </TableCell>
                  <TableCell>{row.entity}</TableCell>
                  <TableCell>{row.message}</TableCell>
                </TableRow>
              ))}
            </Table>
            <Button
              label="Limpiar"
              icon="delete"
              raised
              onClick={this.onClearStatusHandler}
            />
          </div>
        )}
      </div>
    );
  }
}

AdminSectoresComponent.propTypes = {
  sectores: sectoresListShape,
  status: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      entity: PropTypes.string,
      message: PropTypes.string,
    })
  ),
  onDeleteSectores: PropTypes.func,
  onUploadSector: PropTypes.func,
  onClearStatusAdmin: PropTypes.func,
};

// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';
import initStore from '_utils/initStore';

import {
  listSectores,
  deleteSectores,
  addSector,
  clearStatusAdmin,
} from '_store/actions';
import { selSectores, selStatusAdmin } from '_store/selectors';

import AdminSectores from '_components/adminSectores';

import type { State } from '_store/flowtypes';

export const storeInitializer: Dispatch => void = dispatch =>
  dispatch(listSectores());

export const mapStateToProps = (state: State) => ({
  sectores: selSectores(state),
  status: selStatusAdmin(state),
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDeleteSectores: (idSectores: IdType[]): Promise<any> =>
    dispatch(deleteSectores(idSectores)),
  onUploadSector: (fileName: string): Promise<any> =>
    dispatch(addSector(fileName)),
  onClearStatusAdmin: (): Promise<any> => dispatch(clearStatusAdmin()),
});

export default compose(
  initStore(storeInitializer),
  connect(mapStateToProps, mapDispatchToProps)
)(AdminSectores);
