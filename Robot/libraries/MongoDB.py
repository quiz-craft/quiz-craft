import pymongo
from robot.api.logger import info, debug, trace, console
from robot.api.deco import keyword, library


@library
class MongoDB:
    '''This is a custom written keyword library for MongoDB actions.'''

    ROBOT_LIBRARY_SCOPE = 'SUITE'

    def __init__(
            self, connection_string: str = "mongodb://127.0.0.1:27017",
            db_name: str = "testing") -> None:
        self._client = pymongo.MongoClient(connection_string)
        self._database = self.client[db_name]

    @property
    def client(self):
        """ Return current pymongo client """
        if not self._client:
            raise SystemError(
                'No connection established!')
        return self._client

    @property
    def database(self):
        """ Return current selected database """
        if self._database is None:
            raise PermissionError('No valid database selected.')
        return self._database

    @keyword
    def drop_database(self, db_name: str = ""):
        ''' Drop given database. If no database name is given, the default one will be dropped. '''
        if db_name == "":
            db_name = self.database.name
        self.client.drop_database(db_name)
        info(f'Database {db_name} was dropped.')
