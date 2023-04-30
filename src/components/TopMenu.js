import { View, StyleSheet, Text } from "react-native";
import SortButton from "./buttons/SortButton";
import ViewButton from "./buttons/ViewButton";
import SortModal from "./modals/SortModal";
import ViewModal from "./modals/ViewModal";
import { useState } from "react";

const TopMenu = ({sort, setSort, view, setView, palette}) => {
  const [sortModal, setSortModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const styles = StyleSheet.create({
    container: {
      height: '8%',
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: '4%',
      paddingRight: '4%',
      paddingBottom: '2.5%'
    },
    logo: {
        fontSize: 24,
        color: palette.primary
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20%'
    }
  });

  return (
    <View style={styles.container}>
        <Text style={styles.logo}>QuickNotes</Text>
        <View style={styles.buttonContainer}>
            <SortButton 
                onPress={() => setSortModal(!sortModal)} 
                color={sortModal ? palette.primary : "grey"}
            />
            <ViewButton 
                onPress={() => setViewModal(!viewModal)} 
                color={viewModal ? palette.primary : "grey"}
            />
            <SortModal visible={sortModal} setSortModal={setSortModal} sort={sort} setSort={setSort} palette={palette}/>
            <ViewModal visible={viewModal} setViewModal={setViewModal} view={view} setView={setView} palette={palette}/>
        </View>
    </View>
  );
}

export default TopMenu;