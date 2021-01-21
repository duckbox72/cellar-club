import pandas as pd
from .models import Lwin

# Load data to DF and delete unecessary columns
df = pd.read_excel('LWINdatabase2.xls', 'LWINdatabase')
df.drop(['STATUS', 'DATE_ADDED', 'DATE_UPDATED'], axis=1, inplace=True)

# transform every column to string type
df = df.applymap(str)

for index, row in df.iterrows():
    
    lwin = row['LWIN']
    display_name = row['DISPLAY_NAME']
    producer_title = row['PRODUCER_TITLE']
    producer_name =  row['PRODUCER_NAME']
    wine = row['WINE']
    country = row['COUNTRY']
    region = row['REGION']
    sub_region = row['SUB_REGION']
    site = row['SITE']
    parcel = row['PARCEL']
    colour = row['COLOUR']
    type = row['TYPE']
    sub_type = row['SUB_TYPE']
    designation = row['DESIGNATION']
    classification = row['CLASSIFICATION']
    vintage_config = row['VINTAGE_CONFIG']
    first_vintage = row['FIRST_VINTAGE']
    final_vintage = row['FINAL_VINTAGE']
    reference = row['REFERENCE']

    new_lwin = Lwin(lwin=lwin, display_name=display_name, producer_title=producer_title, producer_name=producer_name, 
                    wine=wine, country=country, region=region, sub_region=sub_region, site=site, parcel=parcel,
                    colour=colour, type=type, sub_type=sub_type, designation=designation, classification=classification, 
                    vintage_config=vintage_config, first_vintage=first_vintage, final_vintage=final_vintage)

    new_lwin.save()
